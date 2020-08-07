#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

ARG sdk_vsn=1.3.0

FROM digitalasset/daml-sdk:${sdk_vsn}

WORKDIR /home/daml/

COPY --chown=daml scripts scripts

ENV JAVA_TOOL_OPTIONS -Xmx128m

ENTRYPOINT scripts/waitForLedger.sh "$LEDGER_HOST" "$LEDGER_PORT" && \
           scripts/startTriggers.sh "$LEDGER_HOST" "$LEDGER_PORT" target/app.dar
