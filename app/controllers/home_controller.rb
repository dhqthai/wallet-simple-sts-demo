# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    @users = User.all.reject{|u| u.id == current_user&.id || u.wallet.nil?}
    @wallet_balance = current_user&.wallet_balance
  end
end
