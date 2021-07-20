class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.string :name, null: false, unique: true

      t.timestamps
    end
  end
end
