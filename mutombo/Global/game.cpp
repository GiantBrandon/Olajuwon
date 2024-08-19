#include <iostream>
#include <vector>
#include <SDL.h>
#include <SDL_ttf.h>
#include <emscripten.h>
#include "game.h"
#include "constants.h"

SDL_Window *window = NULL;
SDL_Renderer *renderer = NULL;

SDL_Rect redButton = { WINDOW_HEIGHT + 24, 24, 24, 24 };
SDL_Rect greenButton = { WINDOW_HEIGHT + 24, 72, 24, 24 };
SDL_Rect blueButton = { WINDOW_HEIGHT + 24, 120, 24, 24 };

Game game = Game();

Game::Game() {
   current = 0;
   towers = std::vector<Tower>();
   enemies = std::vector<Enemy>();
}

void Game::tick() {
   if (enemies.size() == 0)
      enemies.push_back(Enemy());
   for (int i = 0; i < enemies.size(); i++) {
      enemies[i].update();
   }
}

void Game::render() {
   for (int i = 0; i < path.size() - 1; i++) {
      SDL_Rect rect = {
         std::min(path[i].first, path[i + 1].first) - static_cast<int>(size / 2),
         std::min(path[i].second, path[i + 1].second) - static_cast<int>(size / 2),
         std::abs(path[i].first - path[i + 1].first) + static_cast<int>(size),
         std::abs(path[i].second - path[i + 1].second) + static_cast<int>(size),
      };
      SDL_SetRenderDrawColor(renderer, 50, 50, 50, 255);
      SDL_RenderFillRect(renderer, &rect);
   }
   for (Tower t : towers) {
      t.render(renderer);
   }
   for (Enemy e : enemies) {
      e.render(renderer);
   }
   SDL_Rect panel = { WINDOW_HEIGHT, 0, WINDOW_WIDTH - WINDOW_HEIGHT, WINDOW_HEIGHT };
   SDL_SetRenderDrawColor(renderer, 18, 18, 18, 255);
   SDL_RenderFillRect(renderer, &panel);

   SDL_SetRenderDrawColor(renderer, 255, 0, 0, 255);
   SDL_RenderFillRect(renderer, &redButton);
   SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
   SDL_RenderDrawRect(renderer, &redButton);

   SDL_SetRenderDrawColor(renderer, 0, 255, 0, 255);
   SDL_RenderFillRect(renderer, &greenButton);
   SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
   SDL_RenderDrawRect(renderer, &greenButton);

   SDL_SetRenderDrawColor(renderer, 0, 0, 255, 255);
   SDL_RenderFillRect(renderer, &blueButton);
   SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
   SDL_RenderDrawRect(renderer, &blueButton);
}

Tower * Game::addTower(int x, int y) {
   Tower t;
   t.x = x / size * size + size / 2;
   t.y = y / size * size + size / 2;
   towers.push_back(t);
   return &towers[towers.size() - 1];
}

void Game::handle(int x, int y) {
   if (x > redButton.x && x < redButton.x + redButton.w && y > redButton.y && y < redButton.y + redButton.h) {
      if (current -> r < 250) current -> r += 25;
   } else if (x > greenButton.x && x < greenButton.x + greenButton.w && y > greenButton.y && y < greenButton.y + greenButton.h) {
      if (current -> g < 250) current -> g += 25;
   } else if (x > blueButton.x && x < blueButton.x + blueButton.w && y > blueButton.y && y < blueButton.y + blueButton.h) {
      if (current -> b < 250) current -> b += 25;
   }
}

Tower * Game::findTower(int x, int y) {
   for (int i = 0; i < towers.size(); i++) {
      if (
         (x > towers[i].x - size / 2 && x < towers[i].x + size / 2) &&
         (y > towers[i].y - size / 2 && y < towers[i].y + size / 2)
      ) {
         return &towers[i];
      }
   }
   return nullptr;
}

bool init() {
     if (SDL_Init(SDL_INIT_VIDEO) < 0) {
        return false;
    }

    SDL_CreateWindowAndRenderer(WINDOW_WIDTH, WINDOW_HEIGHT, 0, &window, &renderer);
    if (window == NULL | renderer == NULL) {
        return false;
    } 

    return true;
}

void process_event(SDL_Event event) {
   if(event.type == SDL_MOUSEBUTTONDOWN) {
      int xMouse, yMouse;
      SDL_GetGlobalMouseState(&xMouse,&yMouse);
      if (xMouse > WINDOW_HEIGHT) {
         game.handle(xMouse, yMouse);
      } else {
         Tower* t = game.findTower(xMouse, yMouse);
         if (t == nullptr) {
            game.current = game.addTower(xMouse, yMouse);
         } else {
            game.current = t;
         }
      }
   }
}

void process_input() {
    SDL_Event event;

    while (SDL_PollEvent(&event)) {
        process_event(event);
    }
}

void draw() {
   game.render();
}

void main_loop() {
    process_input();

    SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);
    SDL_RenderClear(renderer);
    
    game.tick();
    draw();    

    SDL_RenderPresent(renderer);
}

void destroy() {
    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    SDL_Quit();
}

extern "C" {

   int start() {
      init();
      
      emscripten_set_main_loop(main_loop, -1, 1);
      
      destroy();
      return EXIT_SUCCESS;
   }

}