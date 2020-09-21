class UserMailer < ApplicationMailer
  default from: 'noreply@taskmanager.com'

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
    @task = params[:task]

    mail(to: user.email, subject: 'Task Deleted')
  end

  def user_instruction
    user = params[:user]

    mail(to: user.email, subject: 'Info')
  end

end
