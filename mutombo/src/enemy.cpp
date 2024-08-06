#include <iostream>
#include <SDL.h>
#include "enemy.h"
#include "constants.h"

int id = 0;

Enemy::Enemy() {
   x = 0;
   y = 0;
   target = id++;
}

void Enemy::update() {
   std::pair<int, int> coordinate = path[target];
   if (x < coordinate.first) {
    x++;
   } else if (x > coordinate.first) {
    x--;
   }
   if (y < coordinate.second) {
    y++;
   } else if (y > coordinate.second) {
    y--;
   }
   if (x == coordinate.first && y == coordinate.second)
      target++;
   if (target == path.size())
      std::cout << "teehee";
}

void Enemy::render(SDL_Renderer *renderer) {
   SDL_Color color = SDL_Color{ 100, 100, 100, 255 };
      float floatX = static_cast<float>(x);
      float floatY = static_cast<float>(y);
      const std::vector<SDL_Vertex> verts {
         {{floatX - sizeWithMargin / 4, floatY + sizeWithMargin / 2}, color, {1, 1}},
         {{floatX - sizeWithMargin / 2, floatY}, color, {1, 1}},
         {{floatX - sizeWithMargin / 4, floatY - sizeWithMargin / 2}, color, {1, 1}},

         {{floatX + sizeWithMargin / 4, floatY - sizeWithMargin / 2}, color, {1, 1}},
         {{floatX + sizeWithMargin / 2, floatY}, color, {1, 1}},
         {{floatX + sizeWithMargin / 4, floatY + sizeWithMargin / 2}, color, {1, 1}},

         {{floatX - sizeWithMargin / 4, floatY + sizeWithMargin / 2}, color, {1, 1}},
         {{floatX - sizeWithMargin / 4, floatY - sizeWithMargin / 2}, color, {1, 1}},
         {{floatX + sizeWithMargin / 4, floatY - sizeWithMargin / 2}, color, {1, 1}},

         {{floatX + sizeWithMargin / 4, floatY - sizeWithMargin / 2}, color, {1, 1}},
         {{floatX + sizeWithMargin / 4, floatY + sizeWithMargin / 2}, color, {1, 1}},
         {{floatX - sizeWithMargin / 4, floatY + sizeWithMargin / 2}, color, {1, 1}},
      };
      SDL_RenderGeometry(renderer, nullptr, verts.data(), verts.size(), nullptr, 0 );

      SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);

      const std::vector<SDL_Point> points {
         {x - sizeWithMargin / 4, y + sizeWithMargin / 2},
         {x - sizeWithMargin / 2, y},
         {x - sizeWithMargin / 4, y - sizeWithMargin / 2},
         {x + sizeWithMargin / 4, y - sizeWithMargin / 2},
         {x + sizeWithMargin / 2, y},
         {x + sizeWithMargin / 4, y + sizeWithMargin / 2},
         {x - sizeWithMargin / 4, y + sizeWithMargin / 2},
      };
      SDL_RenderDrawLines(renderer, points.data(), points.size());
}
