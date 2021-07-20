# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Relationship
  has_one :wallet, as: :walletable

  # Callbacks
  after_create :generate_wallet

  def wallet_key
    self.wallet&.address_key
  end

  def wallet_balance
    wallet_transactions = self.wallet&.wallet_transactions
    income = wallet_transactions.where(action_type: WalletTransaction::INCOME).sum(:transaction_amount) || 0
    outcome = wallet_transactions.where(action_type: WalletTransaction::OUTCOME).sum(:transaction_amount) || 0

    income - outcome
  end

  private
  def generate_wallet
    self.create_wallet!({address_key: SecureRandom.uuid})
  end
end
