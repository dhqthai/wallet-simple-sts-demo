class Wallet < ApplicationRecord
  belongs_to :walletable, polymorphic: true

  has_many :wallet_transactions, dependent: :destroy

  def deposit(amount, note)
    WalletTransaction.transaction do
      transaction = WalletTransaction.new
      transaction.wallet_id = self.id
      transaction.transaction_target = self.id
      transaction.transaction_type = WalletTransaction::DEPOSIT
      transaction.transaction_amount = amount
      transaction.transaction_note = note
      transaction.action_type = WalletTransaction::INCOME
      transaction.save
    end
  end

  def transfer(amount, target_wallet_id, note)
    WalletTransaction.transaction do
      # For sender
      transaction = WalletTransaction.new
      transaction.wallet_id = self.id
      transaction.transaction_target = target_wallet_id
      transaction.transaction_type = WalletTransaction::TRANSFER
      transaction.transaction_amount = amount
      transaction.transaction_note = note
      transaction.action_type = WalletTransaction::OUTCOME
      transaction.save

      # For receiver
      transaction = WalletTransaction.new
      transaction.wallet_id = target_wallet_id
      transaction.transaction_target = self.id
      transaction.transaction_type = WalletTransaction::TRANSFER
      transaction.transaction_amount = amount
      transaction.transaction_note = note
      transaction.action_type = WalletTransaction::INCOME
      transaction.save
    end
  end

  def withdraw(amount, note)
    WalletTransaction.transaction do
      transaction = WalletTransaction.new
      transaction.wallet_id = self.id
      transaction.transaction_target = self.id
      transaction.transaction_type = WalletTransaction::WITHDRAW
      transaction.transaction_amount = amount
      transaction.transaction_note = note
      transaction.action_type = WalletTransaction::OUTCOME
      transaction.save
    end
  end
end
