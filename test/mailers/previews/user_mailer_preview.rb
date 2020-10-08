# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def task_created
    user = User.first
    task = Task.first
    params = { user: user, task: task }

    UserMailer.with(params).task_created
  end

  def task_updated
    user = User.first
    task = Task.first
    params = { user: user, task: task }

    UserMailer.with(params).task_updated
  end

  def task_deleted
    user = User.first
    task = Task.first
    params = { user: user, task: task }

    UserMailer.with(params).task_deleted
  end

  def user_instruction
    user = User.first
    params = { user: user }

    UserMailer.with(params).user_instruction
  end

  def send_password
    user = User.first
    user.generate_password_token
    params = { user: user }

    UserMailer.with(params).send_password
  end
end
