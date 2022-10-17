/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
//

import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { MatrixClient, MatrixEvent } from "matrix-js-sdk/src/matrix";

import {
    VoiceBroadcastInfoEventType,
    VoiceBroadcastRecording,
    VoiceBroadcastRecordingPip,
} from "../../../../src/voice-broadcast";
import { mkEvent, stubClient } from "../../../test-utils";

// mock RoomAvatar, because it is doing too much fancy stuff
jest.mock("../../../../src/components/views/avatars/RoomAvatar", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(({ room }) => {
        return <div data-testid="room-avatar">room avatar: { room.name }</div>;
    }),
}));

describe("VoiceBroadcastRecordingPip", () => {
    const userId = "@user:example.com";
    const roomId = "!room:example.com";
    let client: MatrixClient;
    let infoEvent: MatrixEvent;
    let recording: VoiceBroadcastRecording;

    beforeAll(() => {
        client = stubClient();
        infoEvent = mkEvent({
            event: true,
            type: VoiceBroadcastInfoEventType,
            content: {},
            room: roomId,
            user: userId,
        });
        recording = new VoiceBroadcastRecording(infoEvent, client);
    });

    describe("when rendering", () => {
        let renderResult: RenderResult;

        beforeEach(() => {
            renderResult = render(<VoiceBroadcastRecordingPip recording={recording} />);
        });

        it("should create the expected result", () => {
            expect(renderResult.container).toMatchSnapshot();
        });
    });
});