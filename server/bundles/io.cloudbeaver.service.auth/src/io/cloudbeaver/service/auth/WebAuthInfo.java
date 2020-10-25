/*
 * DBeaver - Universal Database Manager
 * Copyright (C) 2010-2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.cloudbeaver.service.auth;

import io.cloudbeaver.model.session.WebSession;
import io.cloudbeaver.model.user.WebUser;
import org.eclipse.core.runtime.IAdaptable;
import org.jkiss.dbeaver.model.access.DBASession;

import java.time.OffsetDateTime;

/**
 * WebAuthInfo
 */
public class WebAuthInfo implements IAdaptable {

    private WebUser user;
    private String authProvider;
    private DBASession authSession;
    private OffsetDateTime loginTime;
    private String message;

    public WebAuthInfo(WebUser user) {
        this.user = user;
    }

    public String getUserId() {
        return user.getUserId();
    }

    public String getDisplayName() {
        return user.getDisplayName();
    }

    public String getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(String authProvider) {
        this.authProvider = authProvider;
    }

    public DBASession getAuthSession() {
        return authSession;
    }

    public void setAuthSession(DBASession authSession) {
        this.authSession = authSession;
    }

    public OffsetDateTime getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(OffsetDateTime loginTime) {
        this.loginTime = loginTime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public <T> T getAdapter(Class<T> adapter) {
        // Needed to extract auth context from web session
        if (adapter.isInstance(authSession)) {
            return adapter.cast(authSession);
        }
        return null;
    }

    public static WebAuthInfo getFromSession(WebSession webSession) {
        return webSession.getAttribute(DBWServiceAuth.ATTR_USER_AUTH);
    }

}
