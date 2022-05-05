Rails.application.routes.draw do

  # 認証テスト用
  get 'private' => 'private#private'
  get 'private-scoped' => 'private#private_scoped'
  get 'public' => 'public#public'

  resources :user_profiles
  resources :comments
  resources :likes
  resources :tweets
  # resources :users

  put "user/update" => "users#update"
  post "users/login" => "users#login"
end