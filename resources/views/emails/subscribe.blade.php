@component('mail::message')
Brainster.co

Почитуван/на со емаил {{ $email }},

успешно се зачленивте на нашиот билтен!


Доколку имате желба да прикачите некој туторијал, кликнете подолу!
@component('mail::button', ['url' => "http://brainstertools.topaddict.net"])
    Креирај сметка
@endcomponent

Ви благодариме,<br>
Со Почит, <br>
Тимот на {{ config('app.name') }}
@endcomponent