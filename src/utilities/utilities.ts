export function errorResponse()
{
    return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Internal Server Error',
          data: null,
        }),
        { status: 500 }
    );
}

export {}