<?php
 header('Content-Type: application/json');
     echo json_encode('[{id: 1,question: "Сколько лет создателю?",answer: "",}, {id: 3,question: "Его любимый язык программирования?",answer: "",}]', JSON_UNESCAPED_UNICODE);