<h1>Varse.io</h1>
<p>Varse is a simple tool for managing server variables at runtime. It's optimal for updating configurations without redeploying.</p>

<ul>
    <li><strong>Managing Feature Flags:</strong> Toggle features on and off quickly</li>
    <li><strong>Updating API Credentials:</strong> Swap API keys and credentials seamlessly</li>
    <li><strong>Scaling Operations:</strong> Adjust limits based on traffic instantly</li>
    <li><strong>Handling Environment Specifics:</strong> Set and update environment-specific variables easily</li>
    <li><strong>A/B Testing:</strong> Route traffic and alter features for tests efficiently</li>
</ul><br>

<h2>Getting Started</h2>
<h3>Varse Cloud (Recommended)</h3>
<p>Get started with Varse Cloud quickly by following these simple steps:</p>
<ol>
    <li><strong>Create an Account</strong> - Sign up at <a href="https://varse.io/signup">varse.io/signup</a></li>
    <li><strong>Make a Project</strong></li>
    <li><strong>Create a Variable</strong></li>
    <li><strong>Create an API Key</strong></li>
    <li><strong>Read Your Variable from the API</strong>
        <pre><code>curl -X GET https://api.varse.io/variables/example_variable \
-H "Authorization: Bearer $API_KEY"</code></pre>
    </li>
</ol><br>

<h2>Managing Variables</h2>
<p>You can perform CRUD actions on your variables straight from <a href="https://varse.io/dashboard">varse.io/dashboard</a>.</p>

<p>Or, you can also perform CRUD actions on variables through the API:</p>

<ol>
    <li><strong>Create a Variable:</strong>
        <pre><code>curl -X POST https://api.varse.io/variables \
-H "Authorization: Bearer $API_KEY" \
-H "Content-Type: application/json" \
-d '{"name": "new_variable", "value": "initial_value"}'</code></pre>
    </li>
    <li><strong>Read a Variable:</strong>
        <pre><code>curl -X GET https://api.varse.io/variables/new_variable \
-H "Authorization: Bearer $API_KEY"</code></pre>
    </li>
    <li><strong>Update a Variable:</strong>
        <pre><code>curl -X PUT https://api.varse.io/variables/new_variable \
-H "Authorization: Bearer $API_KEY" \
-H "Content-Type: application/json" \
-d '{"value": "updated_value"}'</code></pre>
    </li>
    <li><strong>Delete a Variable:</strong>
        <pre><code>curl -X DELETE https://api.varse.io/variables/new_variable \
-H "Authorization: Bearer $API_KEY"</code></pre>
    </li>
</ol>
