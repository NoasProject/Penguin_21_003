class User < ApplicationRecord
       # belongs_to :tweet
       has_many :tweets
       
       # tokenからユーザーを取得する
       def self.from_token_payload(payload)
              find_by(auth0_sub: payload['sub']) || create!(auth0_sub: payload['sub'])
       end
end
