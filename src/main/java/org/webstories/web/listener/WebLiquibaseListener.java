package org.webstories.web.listener;

import javax.servlet.annotation.WebListener;

import liquibase.integration.servlet.LiquibaseServletListener;

@WebListener
public class WebLiquibaseListener extends LiquibaseServletListener {}
