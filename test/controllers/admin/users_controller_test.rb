require 'test_helper'

class Admin::UsersControllerTest < ActionController::TestCase
  setup do
    admin = create(:admin)
    sign_in admin
  end

  test 'should get show' do
    user = create(:user)
    get :show, params: { id: user.id }
    assert_response :success
  end

  test 'should get index' do
    get :index
    assert_response :success
  end

  test 'should get edit' do
    user = create(:user)
    get :edit, params: { id: user.id }
    assert_response :success
  end

  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    user = attributes_for(:user)
    post :create, params: { user: user }
    assert_response :redirect
    assert_not_nil User.find_by_email(user[:email])
  end

  test 'should patch update' do
    user = create(:user)
    user_attrs = attributes_for(:user)
    patch :update, params: { id: user.id, user: user_attrs }
    assert_response :redirect

    user = User.find_by(user_attrs.slice(:email, :first_name, :last_name, :type))
    assert_not_nil user
    assert user.authenticate(user_attrs[:password])
  end

  test 'should delete destroy' do
    user_attr = attributes_for(:user)
    user = create(:user, user_attr)
    delete :destroy, params: { id: user.id }
    assert_response :redirect
    assert_nil User.find_by_email(user_attr[:email])
  end
end
