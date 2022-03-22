class Tweet < ApplicationRecord
    # TweetはUserを保有している
    belongs_to :user
    has_many :comments
    has_many :likes
end
