class UsersController < PrivateController
  # before_action :authenticate_user!, except: [:exits, :register]

  # GET /user
  def index
    @user = User.all
    @user_ids = params[:user_ids].to_uniq_array
    if (@user_ids.size != 0)
      @user = @user.where(id: @user_ids)
    end
    
    render json: @user
  end

  # PATCH/PUT /user
  def update
    if @userAccount.update(user_params)
      render json: @userAccount
    else
      render json: @userAccount.errors, status: :unprocessable_entity
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
