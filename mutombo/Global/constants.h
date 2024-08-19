#include <utility>
#include <vector>

const unsigned int size = 32;
const int sizeWithMargin = 30;
const unsigned int WINDOW_WIDTH = 640;
const unsigned int WINDOW_HEIGHT = 480;

const std::vector<std::pair<int, int>> path = {
    { 0, 4 * size + size / 2 },
    { 4 * size + size / 2, 4 * size + size / 2 },
    { 4 * size + size / 2, 1 * size + size / 2 },
    { 6 * size + size / 2, 1 * size + size / 2 },
    { 6 * size + size / 2, 6 * size + size / 2 },
    { 4 * size + size / 2, 6 * size + size / 2 },
    { 4 * size + size / 2, 11 * size + size / 2 },
    { 6 * size + size / 2, 11 * size + size / 2 },
    { 6 * size + size / 2, 10 * size + size / 2 },
    { 7 * size + size / 2, 10 * size + size / 2 },
    { 7 * size + size / 2, 9 * size + size / 2 },
    { 10 * size + size / 2, 9 * size + size / 2 },
    { 10 * size + size / 2, 5 * size + size / 2 },
    { 14 * size + size / 2, 5 * size + size / 2 },
    { 14 * size + size / 2, 3 * size + size / 2 },
    { 12 * size + size / 2, 3 * size + size / 2 },
    { 12 * size + size / 2, 11 * size + size / 2 },
    { 13 * size + size / 2, 11 * size + size / 2 },
    { 13 * size + size / 2, 13 * size + size / 2 },
    { 12 * size + size / 2, 13 * size + size / 2 },
    { 12 * size + size / 2, 14 * size + size / 2 },
};