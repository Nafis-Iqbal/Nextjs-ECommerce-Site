export function errorResponse(error: unknown)
{
  const errorMessage = error instanceof Error ? error.message: 'Unidentified Error'; 
  
  return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Internal Server Error.' + errorMessage,
        data: null,
      }),
      { status: 500 }
  );
}

export {}