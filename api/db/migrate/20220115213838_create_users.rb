class CreateUsers < ActiveRecord::Migration[6.0]
    def change
        create_table :users do |t|
            t.string :name
            t.string :token
            t.string :access_token
            t.string :description
            t.timestamps
        end

        # index を付与してこの値がunique値になるように設定する
        add_index :users, [:token], unique: true

        # index を付与する
        add_index :users, [:access_token]
    end
end
