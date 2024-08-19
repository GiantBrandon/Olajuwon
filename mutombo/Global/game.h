#include "tower.h"
#include "enemy.h"

class Game {
    public:
    Tower * current;
    Game();
    void tick();
    void render();
    Tower * addTower(int x, int y);
    Tower * findTower(int x, int y);
    void handle(int x, int y);

    private:
    std::vector<Tower> towers;
    std::vector<Enemy> enemies;

};