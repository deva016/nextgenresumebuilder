import Link from 'next/link';
import getUserSession from '@/lib/getUserSession';
import createSupabaseServerClient from '@/lib/supabase/server';

const Header = async () => {
  const { data } = await getUserSession();

  const logoutAction = async () => {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  };

  return (
    
    <div className="relative"> {/* Added relative wrapper for absolute header */}
      {/* Rounded, Centered Header */}
      <div className="flex justify-center w-full fixed top-0 left-0 z-10 bg-opacity-90 backdrop-blur-sm py-2">
        <header className="bg-white border border-gray-200 px-4 lg:px-6 py-2.5 rounded-full shadow-md w-full max-w-screen-lg">
          <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link href='/' className='text-ct-dark-600 text-2xl font-semibold'>
          NextGenResume
          </Link>
        </div>
        <ul className='flex items-center space-x-4'>
          <li>
            <Link href='/' className='text-ct-dark-600'>
              Home
            </Link>
          </li>
          {!data.session && (
            <>
              <li>
                <Link href='/register' className='text-ct-dark-600'>
                  Register
                </Link>
              </li>
              <li>
                <Link href='/login' className='text-ct-dark-600'>
                  Login
                </Link>
              </li>
            </>
          )}
          {data.session && (
            <form action={logoutAction} className='flex'>
              <li>
                <Link href='/profile' className='text-ct-dark-600'>
                  Profile
                </Link>
              </li>
              <li>
                <button className='ml-4'>Logout</button>
              </li>
            </form>
          )}
        </ul>
    </div>
    </header>
    </div>
    </div>
    
  );
};

export default Header;
