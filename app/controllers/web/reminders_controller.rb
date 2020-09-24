class Web::RemindersController < Web::ApplicationController
  def new
    @reminder_send = ReminderSendForm.new
  end

  def create
    @reminder_send = ReminderSendForm.new(create_params)

    if @reminder_send.invalid?
      render(:new)
      return
    end

    user = @reminder_send.user
    user.generate_password_token

    if user.save
      UserMailer.with({ user: user }).reminder_send.deliver_now
      flash[:notice] = 'Link to reset your password was sent to your email.
        Please, check it out'
      redirect_to(:new_reminder)
    else
      render(:new)
    end
  end

  def edit
    user = User.find_by(reset_password_token: params[:id])

    if user.blank?
      flash[:notice] = 'Token not found'
      redirect_to(:new_reminder)
      return
    end
    unless user.password_token_valid?
      flash[:notice] = 'Token not valid'
      redirect_to(:new_reminder)
      return
    end

    @reminder_change = ReminderChangeForm.new
  end

  def update
    @reminder_change = ReminderChangeForm.new(update_params)

    if @reminder_change.invalid?
      render(:edit)
      return
    end

    user = User.find_by(reset_password_token: params[:id])

    unless user.blank?
      if user.password_token_valid?
        user.reset_password(@reminder_change.password)
        if user.save
          redirect_to(:new_session)
          return
        end
      end
    end

    render(:edit)
  end

  private

  def create_params
    params.require(:reminder_send_form).permit(:email)
  end

  def update_params
    params.require(:reminder_change_form).permit(:password, :password_confirmation)
  end
end
