#include <iostream>
#include <vector>
#include <SDL.h>
#include "tower.h"
#include "constants.h"

Tower::Tower() {
   r = 0;
   g = 0;
   b = 0;
}

void Tower::render(SDL_Renderer *renderer) {
   SDL_Color color = SDL_Color{ r, g, b, 255 };
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
