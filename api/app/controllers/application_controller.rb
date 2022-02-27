class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  skip_before_action :verify_authenticity_token
  after_action :set_csrf_token_header

  def set_csrf_token_header
    response.set_header('X-CSRF-Token', form_authenticity_token)
  end

  protected

  def get_user
    @user = current_v1_user
    @user_id = @user[:id]
  end
end
