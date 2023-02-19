Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :courses, shallow: true do
    resources :par
    resources :tee, shallow: true do
      resources :tee_yardage
    end
  end

  resources :score_cards, shallow: true do
    resources :player, shallow: true do
      resources :player_score
    end
  end
end
