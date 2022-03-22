class UsersController < ApplicationController

  # GET /user
  def index
    @user = User.all
    @user_ids = params[:user_ids].to_uniq_array
    if (@user_ids.size != 0)
      @user = @user.where(id: @user_ids)
    end
    
    render json: @user
  end

  # POST /users/exits
  # Userが存在するかチェックする
  def exits
    result = { is_register: false }

    logger.debug @userAccount

    # アカウントが存在する場合
    if @userAccount != nil
      result[:is_register] = true
    end

    render json: result
  end

  # POST /users/register
  # Userを作成する
  def register
    @user = User.new(user_params)
    @user[:token] = @token
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # POST /users/login
  # Userを作成する
  def login
    if @userAccount.nil?
      render json: { error_code: 1 }, status: :unprocessable_entity
    end

    render json: @userAccount

  end

  # DELETE /user/1
  def destroy
    @user.destroy
  end

  private

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:name, :description)
  end

end
