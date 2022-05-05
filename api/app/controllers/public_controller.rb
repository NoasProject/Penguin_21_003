# frozen_string_literal: true
class PublicController < ActionController::API
    def public
      Rails.logger.debug ENV['AUTH0_DOMAIN']
      render json: { message: 'You don\'t need to be authenticated to call this' }
    end
end