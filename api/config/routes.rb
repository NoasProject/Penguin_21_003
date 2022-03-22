Rails.application.routes.draw do
  resources :user_profiles
  resources :comments
  resources :likes
  resources :tweets
  # resources :users

  post "users/exits" => "users#exits"
  post "users/register" => "users#register"
  post "users/login" => "users#login"
end