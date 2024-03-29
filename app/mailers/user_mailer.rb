class UserMailer < ApplicationMailer
  default from: ENV['DEFAULT_FROM_EMAIL']

  def task_created
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'New Task Created')
  end

  def task_updated
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'Task Updated')
  end

  def task_deleted
    user = params[:user]
    @task_id = params[:task_id]

    mail(to: user.email, subject: 'Task Deleted')
  end

  def user_instruction
    user = params[:user]

    mail(to: user.email, subject: 'Info')
  end

  def send_password
    @user = params[:user]
    @url = edit_password_url(@user.reset_password_token)

    mail(to: @user.email, subject: 'Password Recovery Request')
  end
end
