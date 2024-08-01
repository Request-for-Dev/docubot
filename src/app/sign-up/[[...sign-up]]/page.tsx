'use client';
import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/util/utils';
import Image from 'next/image';
import { BsMicrosoft } from 'react-icons/bs';

export default function SignUpPage() {
  return (
    <div className='mt-6 grid w-full grow items-center px-4 sm:justify-center'>
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name='start'>
                <Card className='w-full sm:w-96'>
                  <CardHeader>
                    <Image src='/logo.png' alt='Docubot logo' width={55} height={55} />
                    <CardTitle>Create your Docubot account</CardTitle>
                    <CardDescription>
                      Welcome! Please fill in the details to get started.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='grid gap-y-4'>
                    <Clerk.GlobalError className='text-sm text-destructive' />
                    <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                      <Clerk.Connection name='github' asChild>
                        <Button
                          size='sm'
                          variant='outline'
                          type='button'
                          disabled={isGlobalLoading}
                          aria-label='Sign up with GitHub'
                        >
                          {isGlobalLoading ? (
                            <Icons.spinner className='size-4 animate-spin' />
                          ) : (
                            <>
                              <Icons.gitHub className='mr-2 size-4' />
                              GitHub
                            </>
                          )}
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name='google' asChild>
                        <Button
                          size='sm'
                          variant='outline'
                          type='button'
                          disabled={isGlobalLoading}
                          aria-label='Sign up with Google'
                        >
                          {isGlobalLoading ? (
                            <Icons.spinner className='size-4 animate-spin' />
                          ) : (
                            <>
                              <Icons.google className='mr-2 size-4' />
                              Google
                            </>
                          )}
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name='microsoft' asChild>
                        <Button
                          size='sm'
                          variant='outline'
                          type='button'
                          disabled={isGlobalLoading}
                          aria-label='Sign up with Microsoft'
                        >
                          {isGlobalLoading ? (
                            <Icons.spinner className='size-4 animate-spin' />
                          ) : (
                            <>
                              <BsMicrosoft className='mr-2 size-4' />
                              Microsfot
                            </>
                          )}
                        </Button>
                      </Clerk.Connection>

                      <Clerk.Connection name='apple' asChild>
                        <Button
                          size='sm'
                          variant='outline'
                          type='button'
                          disabled={isGlobalLoading}
                          aria-label='Sign up with Apple'
                        >
                          {isGlobalLoading ? (
                            <Icons.spinner className='size-4 animate-spin' />
                          ) : (
                            <>
                              <Icons.apple className='mr-2 size-4' />
                              Apple
                            </>
                          )}
                        </Button>
                      </Clerk.Connection>
                    </div>
                    <p className='flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border'>
                      or
                    </p>
                    <Clerk.Field name='username' className='space-y-2'>
                      <Clerk.Label asChild>
                        <Label>Username</Label>
                      </Clerk.Label>
                      <Clerk.Input type='text' required minLength={3} asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className='block text-sm text-destructive' />
                    </Clerk.Field>
                    <Clerk.Field name='emailAddress' className='space-y-2'>
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type='email' required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className='block text-sm text-destructive' />
                    </Clerk.Field>
                    <Clerk.Field name='password' className='space-y-2'>
                      <Clerk.Label asChild>
                        <Label>Password</Label>
                      </Clerk.Label>
                      <Clerk.Input type='password' required minLength={8} asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className='block text-sm text-destructive' />
                    </Clerk.Field>
                    <Clerk.Field name='phoneNumber' className='space-y-2'>
                      <Clerk.Label asChild>
                        <Label>Phone Number</Label>
                      </Clerk.Label>
                      <Clerk.Input type='tel' asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className='block text-sm text-destructive' />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className='grid w-full gap-y-4'>
                      <SignUp.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          {isGlobalLoading ? (
                            <Icons.spinner className='size-4 animate-spin' />
                          ) : (
                            'Sign up'
                          )}
                        </Button>
                      </SignUp.Action>
                      <Button variant='link' size='sm' asChild>
                        <Link href='/sign-in'>Already have an account? Sign in</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name='continue'>
                <Card className='w-full sm:w-96'>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>Please provide any missing information</CardDescription>
                  </CardHeader>
                  <CardContent className='grid gap-y-4'>
                    <Clerk.GlobalError className='text-sm text-destructive' />
                    <Clerk.Field name='username' className='space-y-2'>
                      <Clerk.Label asChild>
                        <Label>Username</Label>
                      </Clerk.Label>
                      <Clerk.Input type='text' required minLength={3} asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className='block text-sm text-destructive' />
                    </Clerk.Field>

                    <Clerk.Field name='name' className='space-y-2'>
                      <Clerk.Label asChild>
                        <Label>Name</Label>
                      </Clerk.Label>
                      <Clerk.Input type='text' asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className='block text-sm text-destructive' />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <SignUp.Action submit asChild>
                      <Button disabled={isGlobalLoading}>
                        {isGlobalLoading ? (
                          <Icons.spinner className='size-4 animate-spin' />
                        ) : (
                          'Continue'
                        )}
                      </Button>
                    </SignUp.Action>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name='verifications'>
                <SignUp.Strategy name='email_code'>
                  <Card className='w-full sm:w-96'>
                    <CardHeader>
                      <CardTitle>Verify your email</CardTitle>
                      <CardDescription>
                        Use the verification link sent to your email address
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-y-4'>
                      <Clerk.GlobalError className='text-sm text-destructive' />
                      <div className='grid items-center justify-center gap-y-2'>
                        <Clerk.Field name='code' className='space-y-2'>
                          <Clerk.Label className='sr-only'>Email code</Clerk.Label>
                          <div className='flex justify-center text-center'>
                            <Clerk.Input
                              type='otp'
                              className='flex justify-center has-[:disabled]:opacity-50'
                              autoSubmit
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className={cn(
                                      'relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
                                      {
                                        'z-10 ring-2 ring-ring ring-offset-background':
                                          status === 'cursor' || status === 'selected',
                                      }
                                    )}
                                  >
                                    {value}
                                    {status === 'cursor' && (
                                      <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                                        <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
                                      </div>
                                    )}
                                  </div>
                                );
                              }}
                            />
                          </div>
                          <Clerk.FieldError className='block text-center text-sm text-destructive' />
                        </Clerk.Field>
                        <SignUp.Action
                          asChild
                          resend
                          className='text-muted-foreground'
                          fallback={({ resendableAfter }) => (
                            <Button variant='link' size='sm' disabled>
                              Didn&apos;t receive a code? Resend (
                              <span className='tabular-nums'>{resendableAfter}</span>)
                            </Button>
                          )}
                        >
                          <Button type='button' variant='link' size='sm'>
                            Didn&apos;t receive a code? Resend
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className='grid w-full gap-y-4'>
                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            {isGlobalLoading ? (
                              <Icons.spinner className='size-4 animate-spin' />
                            ) : (
                              'Verify'
                            )}
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>
                <SignUp.Strategy name='phone_code'>
                  <Card className='w-full sm:w-96'>
                    <CardHeader>
                      <CardTitle>Verify your phone number</CardTitle>
                      <CardDescription>Enter the code sent to your phone</CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-y-4'>
                      <Clerk.GlobalError className='text-sm text-destructive' />
                      <Clerk.Field name='code' className='space-y-2'>
                        <Clerk.Label className='sr-only'>Phone code</Clerk.Label>
                        <div className='flex justify-center text-center'>
                          <Clerk.Input
                            type='otp'
                            className='flex justify-center has-[:disabled]:opacity-50'
                            autoSubmit
                            render={({ value, status }) => {
                              return (
                                <div
                                  data-status={status}
                                  className={cn(
                                    'relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
                                    {
                                      'z-10 ring-2 ring-ring ring-offset-background':
                                        status === 'cursor' || status === 'selected',
                                    }
                                  )}
                                >
                                  {value}
                                  {status === 'cursor' && (
                                    <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                                      <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
                                    </div>
                                  )}
                                </div>
                              );
                            }}
                          />
                        </div>
                        <Clerk.FieldError className='block text-center text-sm text-destructive' />
                      </Clerk.Field>
                      <SignUp.Action
                        asChild
                        resend
                        className='text-muted-foreground'
                        fallback={({ resendableAfter }) => (
                          <Button variant='link' size='sm' disabled>
                            Resend code ({resendableAfter})
                          </Button>
                        )}
                      >
                        <Button type='button' variant='link' size='sm'>
                          Resend code
                        </Button>
                      </SignUp.Action>
                    </CardContent>
                    <CardFooter>
                      <SignUp.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          {isGlobalLoading ? (
                            <Icons.spinner className='size-4 animate-spin' />
                          ) : (
                            'Verify'
                          )}
                        </Button>
                      </SignUp.Action>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}
