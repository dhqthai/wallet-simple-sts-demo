class Api::V1::WalletsController < ApplicationController
  before_action :set_user

  def deposit
    if @user
      begin
        @user.wallet.deposit deposit_params[:amount], deposit_params[:note]
        render json: {message: 'Successfully'}, status: 201
      rescue ActiveRecord::RecordInvalid => e
        render json: {error: e}, status: 400
      rescue Exception => e
        Rails.logger.error e
        render json: {error: 'Something went wrong! Please contact admin for supporting.'}, status: 500
      end
    else
      render json: {error: 'User not found'}, status: 404
    end
  end

  def transfer
    receiver = User.find(transfer_params[:receiver_id]) rescue nil
    receiver_wallet = receiver.wallet
    if @user && @user.id != receiver.id && receiver_wallet.present?
      begin
        if @user.wallet_balance < transfer_params[:amount]
          return render json: {error: 'Insufficient balance to transfer'}, status: 400
        end
        @user.wallet.transfer transfer_params[:amount], receiver_wallet.id, transfer_params[:note]
        render json: {message: 'Successfully'}, status: 201
      rescue ActiveRecord::RecordInvalid => e
        render json: {error: e}, status: 400
      rescue Exception => e
        Rails.logger.error e
        render json: {error: 'Something went wrong! Please contact admin for supporting.'}, status: 500
      end
    else
      render json: {error: 'Validate failed'}, status: 400
    end
  end

  def withdraw
    if @user
      begin
        if @user.wallet_balance < withdraw_params[:amount]
          return render json: {error: 'Insufficient balance to withdraw'}, status: 400
        end
        @user.wallet.withdraw withdraw_params[:amount], withdraw_params[:note]
        render json: {message: 'Successfully'}, status: 201
      rescue ActiveRecord::RecordInvalid => e
        render json: {error: e}, status: 400
      rescue Exception => e
        Rails.logger.error e
        render json: {error: 'Something went wrong! Please contact admin for supporting.'}, status: 500
      end
    else
      render json: {error: 'Validate failed'}, status: 400
    end
  end

  private

  def deposit_params
    params.require(:deposit).permit(:amount, :note)
  end

  def transfer_params
    params.require(:transfer).permit(:amount, :receiver_id, :note)
  end

  def withdraw_params
    params.require(:withdraw).permit(:amount, :note)
  end

  def set_user
    @user = current_user
  end
end
