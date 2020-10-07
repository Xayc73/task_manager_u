class SendTaskDeleteNotificationJob < ApplicationJob
  sidekiq_options queue: :mailers
  sidekiq_throttle_as :mailer
  sidekiq_options lock: :until_and_while_executing, on_conflict: { client: :log, server: :reject }

  def perform(task_id, author_id)
    user = User.find_by(id: author_id)
    return if user.blank?

    UserMailer.with(user: user, task_id: task_id).task_deleted.deliver_now
  end
end
