port module VisibilityFilter exposing (main)

import Redux
import Json.Encode exposing (Value)
import Json.Decode exposing (..)
import Debug exposing (..)


-- NB : a port ending with Payload will only get the payload property, otherwise the full action is sent


port setVisibilityFilterPayload : (Json.Encode.Value -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch [ setVisibilityFilterPayload ensureActionReceived ]



-- ACTIONS


type Msg
    = Noop
    | UpdateFilter String



-- MODEL


type alias Model =
    FilterEnum


type FilterEnum
    = ShowAll
    | ShowCompleted
    | ShowActive



-- ADAPTERS


ensureActionReceived : Json.Decode.Value -> Msg
ensureActionReceived payload =
    let
        decoder =
            Json.Decode.decodeValue Json.Decode.string
    in
        case decoder payload of
            Ok action ->
                UpdateFilter action

            Err err ->
                Debug.log ("Error parsing input => " ++ err)
                    Noop



-- UPDATE


type alias ReduxModel =
    String


reduxToModel : ReduxModel -> Model
reduxToModel reduxModel =
    case reduxModel of
        "SHOW_ALL" ->
            ShowAll

        "SHOW_COMPLETED" ->
            ShowCompleted

        "SHOW_ACTIVE" ->
            ShowActive

        _ ->
            ShowAll



--format the response back to JS


modelToRedux : Model -> Json.Encode.Value
modelToRedux model =
    case model of
        ShowAll ->
            Json.Encode.string "SHOW_ALL"

        ShowCompleted ->
            Json.Encode.string "SHOW_COMPLETED"

        ShowActive ->
            Json.Encode.string "SHOW_ACTIVE"



-- UPDATES


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case action of
        UpdateFilter payload ->
            ( reduxToModel payload, Cmd.none )

        Noop ->
            ( model, Cmd.none )


init : Json.Decode.Value -> ( Model, Cmd Msg )
init initialStateFromJS =
    case Json.Decode.decodeValue Json.Decode.string initialStateFromJS of
        Ok f ->
            ( reduxToModel f, Cmd.none )

        Err err ->
            Debug.log ("Error parsing flag, falling back to default value => " ++ toString initialStateFromJS)
                ( ShowActive, Cmd.none )


main : Program Json.Decode.Value Model Msg
main =
    Redux.programWithFlags
        { init = init
        , update = update
        , encode = modelToRedux
        , subscriptions = subscriptions
        }
