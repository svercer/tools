@component('mail::message')
Brainster.co

Почитуван/на {{ $user }},
Вашиот туторијал со име {{ $course }}, <br> 
кој беше објавен на {{$course_created}},
успешно ја помина проверката на валидност!


@component('mail::button', ['url' => "http://127.0.0.1:9999/profile"])
Линк кон вашиот профил!
@endcomponent

Ви благодариме,<br>
Со Почит, <br>
Тимот на {{ config('app.name') }}
@endcomponent