class Web::PasswordsController < Web::ApplicationController
  def new
    @password_send = PasswordSendForm.new
  end

  def create
    @password_send = PasswordSendForm.new(create_params)

    return render(:new) if @password_send.invalid?

    user = @password_send.user
    user.generate_password_token

    return render(:new) unless user.save

    UserMailer.with({ user: user }).send_password.deliver_now
    flash[:notice] = 'Link to reset your password was sent to your email.
      Please, check it out'
    redirect_to(:new_password)
  end

  def edit
    user = User.find_by(reset_password_token: params[:id])

    if user.blank?
      flash[:notice] = 'Token not found'
      return redirect_to(:new_password)
    end

    if user.password_token_invalid?
      flash[:notice] = 'Token not valid'
      return redirect_to(:new_password)
    end

    @password_change = PasswordChangeForm.new
  end

  def update
    @password_change = PasswordChangeForm.new(update_params)
    return render(:edit) if @password_change.invalid?

    user = User.find_by(reset_password_token: params[:id])
    return render(:edit) if user.blank? || user.password_token_invalid?

    user.reset_password(@password_change.password)
    return redirect_to(:new_session) if user.save

    render(:edit)
  end

  private

  def create_params
    params.require(:password_send_form).permit(:email)
  end

  def update_params
    params.require(:password_change_form).permit(:password, :password_confirmation)
  end
end
