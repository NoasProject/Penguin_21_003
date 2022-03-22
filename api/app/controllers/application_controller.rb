require 'securerandom'

class ApplicationController < ActionController::Base
  before_action :set_user
  after_action :set_access_token
  skip_before_action :verify_authenticity_token

  protected

  def set_user
    @token = Digest::MD5.hexdigest(request.headers[:Token])
    @accessToken = Digest::MD5.hexdigest(request.headers[:AccessToken])

    puts 'RealToken: ' + request.headers[:Token]
    puts 'Token: ' + @token
    puts 'AccessToken: ' + @accessToken

    @userAccount = User.find_by(token: @token)
    # アカウントが存在しない
    if @userAccount != nil
      @user_id = @userAccount[:id]
    end
  end

  # アクセストークンの更新処理をする
  def set_access_token

    accessToken = SecureRandom.alphanumeric

    if @userAccount != nil && @userAccount.update(access_token: accessToken)
      response.set_header("AccessToken", accessToken)
    end
  end
end
