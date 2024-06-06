
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/AuthService';

const LoginScreen = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [processing, setProcessing] = useState(false);
  let navigate = useNavigate();

  const [form, setForm] = useState({
    email: { value: "" },
    password: { value: "" }
  });

  const handleChange = (e) => {
    let _form = { ...form };
    _form[e.target.name].value = e.target.value;
    setForm(_form);
  }

  const submitForm = async (e) => {
    e.preventDefault();

    if (form.email.value && form.password.value) {
      setProcessing(true);

      try {
        let data = await AuthService.login(form.email.value, form.password.value);
        if (data.status) {
          setProcessing(false); 
          navigate(`/`);
          console.log(data.message);
        } else {
          setProcessing(false);
          console.log(data.message);
        }
      }
      catch (e) {
        console.log("e",e);
        setProcessing(false);
        console.error("Something went wrong.");
      }
    } else {
      console.error("All fields are required.");
    }

  }
    
    return <> <section className="">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required
                        value={form.email.value} onChange={handleChange}  />
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required
                         value={form.password.value} onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label for="remember" className="text-gray-500 ">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled={processing} 
                    > {processing ? "Processing..." : "Log In"}</button>
                    <p className="text-sm font-light text-gray-500 ">
                        Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline ">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  </>
}

export default LoginScreen;