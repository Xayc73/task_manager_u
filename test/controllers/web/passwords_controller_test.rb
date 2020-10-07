require 'test_helper'

class Web::PasswordsControllerTest < ActionController::TestCase
  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    user = create(:user)

    post :create, params: { password_send_form: { email: '' } }
    assert_response :success

    assert_emails 1 do
      post :create, params: { password_send_form: { email: user.email } }
    end

    assert_response :redirect
  end

  test 'should get edit' do
    get :edit, params: { id: '123' }
    assert_response :redirect

    user = create(:user)

    get :edit, params: { id: user.reset_password_token }
    assert_response :success

    travel_to user.reset_password_sent_at + 24.hours + 1.minutes do
      get :edit, params: { id: user.reset_password_token }
      assert_response :redirect
    end
  end

  test 'should put update' do
    user = create(:user)
    attrs = {
      id: user.reset_password_token,
      password_change_form: {
        password: user.password,
        password_confirmation: user.password,
      },
    }
    put :update, params: attrs
    assert_response :redirect
  end
end
