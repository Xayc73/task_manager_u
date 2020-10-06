require 'test_helper'

class Web::DevelopersControllerTest < ActionController::TestCase
  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    user = attributes_for(:developer)
    post :create, params: { developer: user }
    assert_response :redirect
    assert_not_nil User.find_by_email(user[:email])
  end
end
