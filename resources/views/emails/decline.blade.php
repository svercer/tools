@component('mail::message')
Brainster.co

Почитуван/на {{ $username }},
Вашиот туторијал со име {{ $coursename }}, <br/> 
кој беше објавен на {{$created_at}},
не ја помина валидноста од тимот на Браинстер!

Подолу може да видите кои се причините, доколку ги поправите, <br/>
туторијалот повторно ке биде разгледан од тимот на Браинстер!

<p style="color: red ">{{$message}}</p>

@component('mail::button', ['url' => "http://127.0.0.1:9999/profile"])
Линк кон вашиот профил!
@endcomponent

Ви благодариме,<br>
Со Почит, <br>
Тимот на {{ config('app.name') }}
@endcomponent