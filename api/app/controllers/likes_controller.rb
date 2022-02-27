class LikesController < ApplicationController
  before_action :get_user
  before_action :set_like, only: [:show, :update]
  before_action :set_like_id, only: [:destroy]
  before_action :authenticate_v1_user!, except: [:new, :create]

  # GET /likes
  def index
    @likes = Like.all

    render json: @likes
  end

  # GET /likes/1
  def show
    render json: @like
  end

  # POST /likes
  def create
    @like = Like.new(like_params)

    if @like.save
      render json: @like, status: :created, location: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /likes/1
  def update
    if @like.update(like_params)
      render json: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  # DELETE /likes/1
  def destroy
    if @like[:user_id] == @user_id
      @like.destroy
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_like_id
    @like = Like.find_by(id: params[:id])
  end

  def set_like
    @like = Like.find_by(tweet_id: params[:tweet_id], user_id: @user_id)
  end

  # Only allow a trusted parameter "white list" through.
  def like_params
    params.require(:like).permit(:tweet_id).merge(user_id: @user_id)
  end
end
