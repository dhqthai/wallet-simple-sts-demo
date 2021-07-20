class CreateWalletTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :wallet_transactions do |t|
      t.integer :wallet_id,           null: false
      t.integer :transaction_target,  null: false
      t.integer :transaction_type,    null: false
      t.decimal :transaction_amount,  precision: 10, scale: 2, null: false
      t.string  :transaction_note,    null: false
      t.integer :action_type,         null: false

      t.timestamps
    end

    add_index :wallet_transactions, [:wallet_id, :transaction_amount]
  end
end
