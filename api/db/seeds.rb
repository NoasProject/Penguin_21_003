# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Userの作成
User.create(:name => 'TEST1', :auth0_sub => '123456789ABC', :description => 'TEST_001_Description')
User.create(:name => 'TEST2', :auth0_sub => '123456789ABC002', :description => 'TEST_002_Description')

# Tweet
Tweet.create(:user_id => 2, :content => 'Tweetしてみているよー!')

# Comments
Comment.create(:tweet_id => 2, :user_id => 1, :comment => 'コメント表示')

