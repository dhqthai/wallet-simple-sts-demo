class WalletTransaction < ApplicationRecord
  belongs_to :wallet

  validates :action_type, :wallet_id, presence: true
  validates :transaction_target, :transaction_amount, :transaction_type, :transaction_note, presence: true

  validates :transaction_amount, numericality: { greater_than: 0 }

  enum action_type: [:income, :outcome]
  enum transaction_type: [:deposit, :transfer, :withdraw]

  ACTION_TYPE = [
    INCOME = 0,
    OUTCOME = 1
  ]

  TRANSACTION_TYPE = [
    DEPOSIT = 0,
    TRANSFER = 1,
    WITHDRAW = 2
  ]
end
