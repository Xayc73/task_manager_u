require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test 'task created' do
    user = create(:user)
    task = create(:task, author: user)
    params = { user: user, task: task }
    email = UserMailer.with(params).task_created

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['dbtaskmanager@gmail.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'New Task Created', email.subject
    assert email.body.to_s.include?("Task #{task.id} was created")
  end

  test 'task updated' do
    user = create(:user)
    task = create(:task, author: user)
    params = { user: user, task: task }
    email = UserMailer.with(params).task_updated

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['dbtaskmanager@gmail.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'Task Updated', email.subject
    assert email.body.to_s.include?("Task #{task.id} was updated")
  end

  test 'task deleted' do
    user = create(:user)
    task = create(:task, author: user)
    params = { user: user, task: task }
    email = UserMailer.with(params).task_deleted

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['dbtaskmanager@gmail.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'Task Deleted', email.subject
    assert email.body.to_s.include?("Task #{task.id} was deleted")
  end

  test 'reminder send' do
    user = create(:user)
    params = { user: user }
    email = UserMailer.with(params).reminder_send

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['dbtaskmanager@gmail.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'Password Recovery Request', email.subject
    assert email.body.to_s.include?(user.reset_password_token)
  end
end
