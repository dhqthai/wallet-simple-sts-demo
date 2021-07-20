# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'

  namespace :api do
    namespace :v1 do
      resources :wallets do
        collection do
          post :deposit
          post :transfer
          post :withdraw
        end
      end
    end
  end
end
