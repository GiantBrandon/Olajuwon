class Enemy {
    public: 
    int x, y, target;
    Enemy();
    void update();
    void render(SDL_Renderer *renderer);
};