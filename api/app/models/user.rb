class User < ApplicationRecord
       # belongs_to :tweet
       has_many :tweets
end