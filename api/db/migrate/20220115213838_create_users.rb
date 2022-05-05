class CreateUsers < ActiveRecord::Migration[6.0]
    def change
        create_table :users do |t|
            t.string :name
            t.string :auth0_sub
            t.string :description
            t.timestamps
        end

        # index を付与してこの値がunique値になるように設定する
        add_index :users, [:auth0_sub], unique: true

    end
end
