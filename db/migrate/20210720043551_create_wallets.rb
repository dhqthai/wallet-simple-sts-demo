class CreateWallets < ActiveRecord::Migration[6.1]
  def change
    create_table :wallets do |t|
      t.integer :walletable_id
      t.string :walletable_type
      t.string :address_key, null: false, unique: true

      t.timestamps
    end
  end
end
